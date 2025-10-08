#!/usr/bin/env python3
"""
Obsidian Vault Sync Script

Automatically syncs markdown notes from your Obsidian vault to the project's vault folder.
Built with TDD - every function is tested.
"""

import os
import shutil
import json
from pathlib import Path
from typing import Dict, List, Optional


def should_sync_file(filepath: str) -> bool:
    """
    Determine if a file should be synced.
    
    Rules:
    - Must be .md file
    - Must not be hidden (start with .)
    - Must not be in .obsidian folder
    
    Args:
        filepath: Path to file (relative or absolute)
        
    Returns:
        True if file should be synced, False otherwise
    """
    path_parts = Path(filepath).parts
    
    # Skip hidden files/folders
    if any(part.startswith('.') for part in path_parts):
        return False
    
    # Only sync markdown files
    if not filepath.endswith('.md'):
        return False
    
    return True


def copy_note(source_path: str, dest_path: str) -> None:
    """
    Copy a single note from source to destination, preserving content.
    
    Args:
        source_path: Source file path
        dest_path: Destination file path
    """
    # Ensure destination directory exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    # Copy file
    shutil.copy2(source_path, dest_path)


def sync_vault(
    source_vault: str,
    dest_vault: str,
    flatten: bool = True,
    clean: bool = False
) -> Dict[str, any]:
    """
    Sync all markdown files from source Obsidian vault to destination vault.
    
    Args:
        source_vault: Path to Obsidian vault
        dest_vault: Path to destination vault folder
        flatten: If True, put all files in root (ignore subdirectories)
        clean: If True, remove files in dest that aren't in source
        
    Returns:
        Dict with sync stats: {'synced': int, 'skipped': int, 'error': str}
    """
    if not os.path.exists(source_vault):
        return {'error': f'Source vault does not exist: {source_vault}'}
    
    # Ensure dest exists
    os.makedirs(dest_vault, exist_ok=True)
    
    synced = 0
    skipped = 0
    source_files = set()
    
    # Walk through source vault
    for root, dirs, files in os.walk(source_vault):
        for filename in files:
            source_path = os.path.join(root, filename)
            rel_path = os.path.relpath(source_path, source_vault)
            
            # Check if should sync
            if not should_sync_file(rel_path):
                skipped += 1
                continue
            
            # Determine destination path
            if flatten:
                # Flatten structure - all files go to root
                dest_path = os.path.join(dest_vault, filename)
            else:
                # Preserve directory structure
                dest_path = os.path.join(dest_vault, rel_path)
            
            # Copy file
            try:
                copy_note(source_path, dest_path)
                source_files.add(filename if flatten else rel_path)
                synced += 1
            except Exception as e:
                print(f"Error copying {rel_path}: {e}")
                skipped += 1
    
    # Clean up dest if requested
    removed = 0
    if clean:
        removed = clean_vault_impl(source_files, dest_vault, flatten)
    
    return {
        'synced': synced,
        'skipped': skipped,
        'removed': removed
    }


def clean_vault_impl(source_files: set, dest_vault: str, flatten: bool) -> int:
    """Helper function for cleaning vault"""
    removed = 0
    for root, dirs, files in os.walk(dest_vault):
        for filename in files:
            if not filename.endswith('.md'):
                continue
            
            dest_path = os.path.join(root, filename)
            rel_path = os.path.relpath(dest_path, dest_vault)
            
            check_name = filename if flatten else rel_path
            if check_name not in source_files:
                os.remove(dest_path)
                removed += 1
    
    return removed


def clean_vault(source_vault: str, dest_vault: str, flatten: bool = True) -> int:
    """
    Remove files from dest vault that don't exist in source vault.
    
    Args:
        source_vault: Path to Obsidian vault
        dest_vault: Path to destination vault
        flatten: Match flattened structure
        
    Returns:
        Number of files removed
    """
    # Get all source files
    source_files = set()
    for root, dirs, files in os.walk(source_vault):
        for filename in files:
            source_path = os.path.join(root, filename)
            rel_path = os.path.relpath(source_path, source_vault)
            
            if should_sync_file(rel_path):
                source_files.add(filename if flatten else rel_path)
    
    return clean_vault_impl(source_files, dest_vault, flatten)


def get_config(config_path: str = 'sync.config.json') -> Dict:
    """
    Load configuration from JSON file.
    
    Args:
        config_path: Path to config file
        
    Returns:
        Dict with config values
    """
    if not os.path.exists(config_path):
        return {}
    
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    """Main entry point for sync script"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Sync Obsidian vault to project vault folder'
    )
    parser.add_argument(
        'source',
        nargs='?',
        help='Path to Obsidian vault (or set in sync.config.json)'
    )
    parser.add_argument(
        '--dest',
        default='vault',
        help='Destination vault folder (default: vault)'
    )
    parser.add_argument(
        '--no-flatten',
        action='store_true',
        help='Preserve directory structure'
    )
    parser.add_argument(
        '--clean',
        action='store_true',
        help='Remove files in dest that aren\'t in source'
    )
    parser.add_argument(
        '--watch',
        action='store_true',
        help='Watch for changes and auto-sync'
    )
    parser.add_argument(
        '--config',
        default='sync.config.json',
        help='Path to config file (default: sync.config.json)'
    )
    
    args = parser.parse_args()
    
    # Load config
    config = get_config(args.config)
    
    # Determine source vault
    source_vault = args.source or config.get('obsidian_vault_path')
    if not source_vault:
        print("Error: No source vault specified.")
        print("Either provide path as argument or set in sync.config.json")
        return 1
    
    # Expand ~ in path
    source_vault = os.path.expanduser(source_vault)
    dest_vault = os.path.expanduser(args.dest)
    
    flatten = not args.no_flatten
    clean = args.clean or config.get('clean', False)
    
    print(f"Syncing from: {source_vault}")
    print(f"Syncing to:   {dest_vault}")
    print(f"Flatten:      {flatten}")
    print(f"Clean:        {clean}")
    print()
    
    if args.watch:
        # Watch mode
        print("Watch mode - monitoring for changes...")
        print("Press Ctrl+C to stop")
        watch_and_sync(source_vault, dest_vault, flatten, clean)
    else:
        # One-time sync
        result = sync_vault(source_vault, dest_vault, flatten, clean)
        
        if 'error' in result:
            print(f"Error: {result['error']}")
            return 1
        
        print(f"✓ Synced:  {result['synced']} files")
        print(f"  Skipped: {result['skipped']} files")
        if clean:
            print(f"  Removed: {result.get('removed', 0)} files")
        print("\nSync complete!")
        return 0


def watch_and_sync(source_vault: str, dest_vault: str, flatten: bool, clean: bool):
    """Watch source vault and auto-sync on changes"""
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
        import time
        
        class SyncHandler(FileSystemEventHandler):
            def __init__(self):
                self.last_sync = 0
                self.debounce_seconds = 2
            
            def on_any_event(self, event):
                # Debounce - don't sync too frequently
                now = time.time()
                if now - self.last_sync < self.debounce_seconds:
                    return
                
                # Skip non-markdown files
                if hasattr(event, 'src_path') and not event.src_path.endswith('.md'):
                    return
                
                print(f"\n[{time.strftime('%H:%M:%S')}] Change detected, syncing...")
                result = sync_vault(source_vault, dest_vault, flatten, clean)
                
                if 'error' not in result:
                    print(f"✓ Synced: {result['synced']} files")
                
                self.last_sync = now
        
        # Initial sync
        print("Performing initial sync...")
        result = sync_vault(source_vault, dest_vault, flatten, clean)
        print(f"✓ Synced: {result['synced']} files\n")
        
        # Set up watcher
        event_handler = SyncHandler()
        observer = Observer()
        observer.schedule(event_handler, source_vault, recursive=True)
        observer.start()
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            observer.stop()
            print("\nStopped watching")
        
        observer.join()
        
    except ImportError:
        print("Error: 'watchdog' package required for watch mode")
        print("Install with: pip install watchdog")
        return 1


if __name__ == '__main__':
    exit(main())

