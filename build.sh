#!/bin/bash

# Generate SHA1 hash of the file content using openssl
hash_js=$(openssl sha1 < ./public/assets/mahasiswa/App.js | awk '{print $2}')

# Copy the file
cp ./public/assets/mahasiswa/App.js ./public/assets/mahasiswa/app.$hash_js.js

cp app/Common.php.sample app/Common.php
echo "" >> app/Common.php
echo "define('HASH_JS', '$hash_js');" >> app/Common.php

rm ./public/assets/mahasiswa/App.js