

function randomPromiseGoesToCatchBlock(param) {
    return new Promise((resolve, reject) => {
        param[0] = 11;
    });
}

randomPromiseGoesToCatchBlock()
.then(() => {
    console.log('nothing');
})
.catch((e) => {
    console.log('without the setTimeout function or any async function the error caused by \'param[0] = 11;\' brings control here into the catch block');
    console.log(e);
});