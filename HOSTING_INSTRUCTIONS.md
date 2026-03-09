# Hosting Instructions for IIITDMJ College Domain

## 1. Build the Project
Open your terminal in VS Code and run the build command:
```bash
npm run build
```
This will compile your project and create a new folder named `out` in your project root.

## 2. Upload with FileZilla
1.  Open **FileZilla** and connect to your college server using your credentials (Host, Username, Password, Port).
2.  Navigate to the `public_html` or `www` directory on the server (right side).
3.  On the left side (local site), navigate to your project folder: `d:\MYPROJECTS\ers_web\out`.
4.  Select **all files and folders inside** the `out` folder.
5.  Drag and drop them to the server directory.

## Important Notes:
-   **Do not upload the `out` folder itself**, just its contents.
-   The build process fetches data from Sanity. If you add new content in Sanity Studio, you must re-run `npm run build` and re-upload the files to update the website.
-   The Sanity Studio features might be limited on the live site. It is recommended to run the studio locally (`npm run dev`) to edit content.
