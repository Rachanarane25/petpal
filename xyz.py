import os

# Define the expected structure
expected_structure = {
    "client": {
        "files": ["index.html", "pets.html", "adopt.html", "login.html", "style.css"],
        "subdirs": {
            "static": {
                "subdirs": {
                    "images": {
                        "files": ["bruno.webp", "chintu.webp"]  # Add more if needed
                    }
                }
            }
        }
    },
    "server": {
        "files": ["app.py", "pets.db"]
    }
}

def check_structure(base_path, structure, relative_path=""):
    missing = []

    for folder, contents in structure.items():
        folder_path = os.path.join(base_path, relative_path, folder)
        if not os.path.isdir(folder_path):
            missing.append(f"Missing folder: {os.path.join(relative_path, folder)}")
            continue

        # Check files
        for file in contents.get("files", []):
            file_path = os.path.join(folder_path, file)
            if not os.path.isfile(file_path):
                missing.append(f"Missing file: {os.path.join(relative_path, folder, file)}")

        # Recursively check subdirectories
        if "subdirs" in contents:
            missing += check_structure(base_path, contents["subdirs"], os.path.join(relative_path, folder))

    return missing

# Run the check
base_directory = "."
missing_items = check_structure(base_directory, expected_structure)

if missing_items:
    print("❌ Missing items:")
    for item in missing_items:
        print("-", item)
else:
    print("✅ All required files and folders are present.")