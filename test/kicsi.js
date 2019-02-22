module.exports = ((config) => {
    const {
        MUTTER
    } = config;
    
    
    return function CanDo() {
        const that = this;
        console.log(MUTTER);
        this.arr.push('mitter');

        CanDo.prototype.do = function() {
            private();
        }
        
        function private() {
            console.log(that.arr);
        }
    }
});