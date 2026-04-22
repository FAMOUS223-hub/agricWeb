import os
import re

def get_new_name(old_name):
    # Rule: Lowercase everything
    new_name = old_name.lower()
    # Rule: Handle " (" -> "-" and ")" -> ""
    new_name = new_name.replace(' (', '-')
    new_name = new_name.replace(')', '')
    # Rule: Handle " " -> "_"
    new_name = new_name.replace(' ', '_')
    return new_name

def rename_files():
    rename_map = {}
    # We should iterate through files and find those that need renaming
    for root, dirs, files in os.walk('.'):
        # Filter out .git and other hidden dirs
        if '/.' in root or root.startswith('./.'):
            continue
            
        for name in files:
            if name == 'rename_and_update.py':
                continue
            
            old_path = os.path.join(root, name)
            new_name = get_new_name(name)
            new_path = os.path.join(root, new_name)
            
            if old_path != new_path:
                rename_map[old_path] = new_path

    # Perform renaming
    actual_renames = {}
    for old_path, new_path in rename_map.items():
        print(f"Renaming: {old_path} -> {new_path}")
        os.rename(old_path, new_path)
        actual_renames[os.path.basename(old_path)] = os.path.basename(new_path)
    
    return actual_renames

def update_references(rename_map):
    # rename_map maps old filename to new filename
    if not rename_map:
        return

    # Sort keys by length descending to avoid partial replacements if names overlap
    sorted_old_names = sorted(rename_map.keys(), key=len, reverse=True)
    
    extensions = ('.html', '.css', '.js', '.md')
    
    for root, dirs, files in os.walk('.'):
        if '/.' in root or root.startswith('./.'):
            continue
            
        for name in files:
            if any(name.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, name)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                new_content = content
                modified = False
                
                for old_name in sorted_old_names:
                    new_name = rename_map[old_name]
                    # We need to be careful with replacements. 
                    # If we just do content.replace(old_name, new_name), 
                    # it might catch things that are not file references.
                    # But given the requirement and the context, it's likely okay.
                    # Use regex to find old_name but maybe with case insensitive search if needed?
                    # The prompt says: "update any references to these files"
                    
                    if old_name in new_content:
                        new_content = new_content.replace(old_name, new_name)
                        modified = True
                    # Also handle case-insensitive matches if the reference in HTML was already different case?
                    # The prompt implies we should match the exact old names we found.
                
                if modified:
                    print(f"Updating references in: {file_path}")
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == "__main__":
    renames = rename_files()
    update_references(renames)
