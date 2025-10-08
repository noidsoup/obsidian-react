import unittest
import os
import shutil
import tempfile
from pathlib import Path
import sys

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sync_obsidian import (
    should_sync_file,
    copy_note,
    sync_vault,
    get_config,
    clean_vault
)


class TestSyncObsidian(unittest.TestCase):
    def setUp(self):
        """Create temporary directories for testing"""
        self.test_dir = tempfile.mkdtemp()
        self.source_vault = os.path.join(self.test_dir, 'obsidian_vault')
        self.dest_vault = os.path.join(self.test_dir, 'vault')
        os.makedirs(self.source_vault)
        os.makedirs(self.dest_vault)

    def tearDown(self):
        """Clean up temporary directories"""
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)

    def test_should_sync_markdown_files(self):
        """Should sync .md files"""
        self.assertTrue(should_sync_file('note.md'))
        self.assertTrue(should_sync_file('path/to/note.md'))

    def test_should_not_sync_hidden_files(self):
        """Should not sync hidden files (starting with .)"""
        self.assertFalse(should_sync_file('.obsidian/config'))
        self.assertFalse(should_sync_file('.git/HEAD'))
        self.assertFalse(should_sync_file('.DS_Store'))

    def test_should_not_sync_non_markdown(self):
        """Should not sync non-markdown files"""
        self.assertFalse(should_sync_file('image.png'))
        self.assertFalse(should_sync_file('document.pdf'))
        self.assertFalse(should_sync_file('data.json'))

    def test_should_not_sync_obsidian_folder(self):
        """Should not sync .obsidian folder contents"""
        self.assertFalse(should_sync_file('.obsidian/workspace.json'))
        self.assertFalse(should_sync_file('.obsidian/plugins/config.json'))

    def test_copy_note_creates_file(self):
        """Should copy note from source to destination"""
        source_file = os.path.join(self.source_vault, 'test.md')
        dest_file = os.path.join(self.dest_vault, 'test.md')
        
        # Create source file
        with open(source_file, 'w', encoding='utf-8') as f:
            f.write('# Test Note\n\nContent here.')
        
        # Copy it
        copy_note(source_file, dest_file)
        
        # Verify
        self.assertTrue(os.path.exists(dest_file))
        with open(dest_file, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertEqual(content, '# Test Note\n\nContent here.')

    def test_copy_note_preserves_frontmatter(self):
        """Should preserve YAML frontmatter"""
        source_file = os.path.join(self.source_vault, 'note.md')
        dest_file = os.path.join(self.dest_vault, 'note.md')
        
        content = """---
title: Test Note
tags: [test, demo]
---

Content here."""
        
        with open(source_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        copy_note(source_file, dest_file)
        
        with open(dest_file, 'r', encoding='utf-8') as f:
            result = f.read()
        self.assertEqual(result, content)

    def test_sync_vault_copies_all_markdown(self):
        """Should sync all markdown files from source to dest"""
        # Create multiple markdown files
        files = ['note1.md', 'note2.md', 'note3.md']
        for filename in files:
            filepath = os.path.join(self.source_vault, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f'# {filename}')
        
        # Sync
        result = sync_vault(self.source_vault, self.dest_vault)
        
        # Verify all copied
        self.assertEqual(result['synced'], 3)
        self.assertEqual(result['skipped'], 0)
        for filename in files:
            dest_path = os.path.join(self.dest_vault, filename)
            self.assertTrue(os.path.exists(dest_path))

    def test_sync_vault_skips_non_markdown(self):
        """Should skip non-markdown files"""
        # Create mixed files
        with open(os.path.join(self.source_vault, 'note.md'), 'w') as f:
            f.write('# Note')
        with open(os.path.join(self.source_vault, 'image.png'), 'w') as f:
            f.write('fake image')
        with open(os.path.join(self.source_vault, 'data.json'), 'w') as f:
            f.write('{}')
        
        result = sync_vault(self.source_vault, self.dest_vault)
        
        # Only markdown should be synced
        self.assertEqual(result['synced'], 1)
        self.assertTrue(os.path.exists(os.path.join(self.dest_vault, 'note.md')))
        self.assertFalse(os.path.exists(os.path.join(self.dest_vault, 'image.png')))
        self.assertFalse(os.path.exists(os.path.join(self.dest_vault, 'data.json')))

    def test_sync_vault_handles_subdirectories(self):
        """Should sync notes in subdirectories (flattened)"""
        # Create nested structure
        os.makedirs(os.path.join(self.source_vault, 'folder1'))
        os.makedirs(os.path.join(self.source_vault, 'folder2'))
        
        with open(os.path.join(self.source_vault, 'root.md'), 'w') as f:
            f.write('# Root')
        with open(os.path.join(self.source_vault, 'folder1', 'note1.md'), 'w') as f:
            f.write('# Note 1')
        with open(os.path.join(self.source_vault, 'folder2', 'note2.md'), 'w') as f:
            f.write('# Note 2')
        
        result = sync_vault(self.source_vault, self.dest_vault, flatten=True)
        
        # All should be in root of dest vault
        self.assertEqual(result['synced'], 3)
        self.assertTrue(os.path.exists(os.path.join(self.dest_vault, 'root.md')))
        self.assertTrue(os.path.exists(os.path.join(self.dest_vault, 'note1.md')))
        self.assertTrue(os.path.exists(os.path.join(self.dest_vault, 'note2.md')))

    def test_clean_vault_removes_old_files(self):
        """Should remove files in dest that aren't in source"""
        # Create files in destination
        with open(os.path.join(self.dest_vault, 'old.md'), 'w') as f:
            f.write('# Old note')
        with open(os.path.join(self.dest_vault, 'keep.md'), 'w') as f:
            f.write('# Keep this')
        
        # Only one in source
        with open(os.path.join(self.source_vault, 'keep.md'), 'w') as f:
            f.write('# Keep this')
        
        # Clean
        removed = clean_vault(self.source_vault, self.dest_vault)
        
        self.assertEqual(removed, 1)
        self.assertFalse(os.path.exists(os.path.join(self.dest_vault, 'old.md')))
        self.assertTrue(os.path.exists(os.path.join(self.dest_vault, 'keep.md')))

    def test_get_config_loads_from_file(self):
        """Should load config from sync.config.json"""
        config_path = os.path.join(self.test_dir, 'sync.config.json')
        config_data = {
            "obsidian_vault_path": "/path/to/vault",
            "flatten": True,
            "clean": False
        }
        
        import json
        with open(config_path, 'w') as f:
            json.dump(config_data, f)
        
        config = get_config(config_path)
        
        self.assertEqual(config['obsidian_vault_path'], '/path/to/vault')
        self.assertTrue(config['flatten'])
        self.assertFalse(config['clean'])

    def test_sync_vault_returns_error_if_source_missing(self):
        """Should return error if source vault doesn't exist"""
        result = sync_vault('/fake/path', self.dest_vault)
        
        self.assertIn('error', result)
        self.assertIn('does not exist', result['error'])


if __name__ == '__main__':
    unittest.main()

