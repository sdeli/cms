module.exports = ((config) => {
    const {
        MUTTER
    } = config;
    
    return function CanDo2() {
        const that = this;
        console.log(MUTTER);
        this.arr.push('mitter');

        CanDo2.prototype.do2 = function() {
            private();+     +
        }
        
        function private() {
            that.arr.push('dasdadsadasd');
        }
    }
});