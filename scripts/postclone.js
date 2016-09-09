var fs = require('fs');
var prompt = require('prompt');

var plugin_name,
  class_name,
  github_username,
  seed_plugin_name = "yourplugin",
  seed_class_name = "YourPlugin",
  seed_github_username = "YourName",
  demo_folder = "demo";

console.log('NativeScript Plugin Seed Configuration');
prompt.start();
askGithubUsername();

function askGithubUsername() {
    prompt.get({
        name: 'github_username',
        description: 'What is your GitHub username (used for updating package.json)? Example: NathanWalker / EddyVerbruggen.'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        github_username = result.github_username;
        askPluginName();
    });
}

function askPluginName() {
    prompt.get({
        name: 'plugin_name',
        description: 'What will be the name of your plugin? Use lowercase characters and dashes only, like: yourplugin / google-maps / bluetooth.'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        plugin_name = result.plugin_name;
        generateClassName();
    });
}

function generateClassName() {
    // the classname becomes 'GoogleMaps' when plugin_name is 'google_maps'
    class_name = "";
    var plugin_name_parts = plugin_name.split("-");
    for (var p in plugin_name_parts) {
        var part = plugin_name_parts[p];
        class_name += (part[0].toUpperCase() + part.substr(1));
    }
    console.log('Configuring ' + class_name + ' as the TypeScript Class name.');
    renameFiles();
}

function renameFiles() {
    console.log('Will now rename some files..');
    var files = fs.readdirSync(".");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(seed_plugin_name) === 0) {
          var newName = plugin_name + file.substr(file.indexOf("."));
          fs.renameSync(file, newName);
      }
    }

    adjustScripts();
}

function adjustScripts() {
    console.log('Adjusting scripts..');
    var files = fs.readdirSync(".");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(".") > 0) {
        var contents = fs.readFileSync(file, 'utf8');
        var result = contents.replace(new RegExp(seed_plugin_name, "g"), plugin_name);
        result = result.replace(new RegExp(seed_class_name, "g"), class_name);
        result = result.replace(new RegExp(seed_github_username, "g"), github_username);
        fs.writeFileSync(fileName, newContent);
      }
    }
    console.log("Configuration finished! If you're not happy with the result please clone the seed again and rerun this script.");
}