let  argv;

try {
    argv = JSON.parse(process.env.npm_config_argv).original;
}	catch(ex) {
    argv = process.argv;
}




