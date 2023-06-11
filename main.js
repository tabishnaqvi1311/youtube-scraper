const scrape = require('./src/crawler')

const main = async() => {
    if(process.argv.length < 3){
        console.log('no video id was entered :(');
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log(`too many args`);
        process.exit(1);
    }

    const id = process.argv[2];
    // const channel = process.argv[3];
    try{
        await scrape(id);
    }
    catch(error){
        const errorMsg = error.message
        console.log(errorMsg);
    }
    return
}

main()
