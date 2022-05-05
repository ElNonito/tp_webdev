# Answer to questions
## Practice 1 
* The command `echo "node_modules" >> .gitignore`adds the line node\_module to the .gitignore file. This is to tell git that it will never need to track any files in node\_modules (because they are libraries we don't need to follow/push/clone every time).
* Natively javascript can't parse json. So when we send json in our body the app can't print it this is why the console logs undefined. The line `app.use(express.json())` permits parsing json.
