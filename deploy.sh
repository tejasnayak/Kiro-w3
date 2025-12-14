#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Create a temporary directory for gh-pages
    echo "Preparing deployment..."
    
    # Add .nojekyll file to prevent Jekyll processing
    touch out/.nojekyll
    
    # Add CNAME file if you have a custom domain (optional)
    # echo "yourdomain.com" > out/CNAME
    
    echo "Build complete! The 'out' directory contains your static files."
    echo "You can now deploy these files to any static hosting service."
    echo ""
    echo "For GitHub Pages:"
    echo "1. Go to your repository settings"
    echo "2. Enable Pages with 'Deploy from a branch'"
    echo "3. Select 'gh-pages' branch"
    echo "4. Run: npm run deploy"
    
else
    echo "Build failed!"
    exit 1
fi