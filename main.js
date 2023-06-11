const scrape = require('./src/crawler')

try {
    if(process.argv.length < 3){
        console.log('no website found');
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log(`too many args`);
        process.exit(1);
    }

    const id = process.argv[2];
    // const channel = process.argv[3];
    scrape(id);
} catch (error) {
    console.log({error: error.message})
}
