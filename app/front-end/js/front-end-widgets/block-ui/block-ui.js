const blockUi = (() => {
    let blockUiElemInnerHtml = ''
        + '<div class="block-ui">'
            + '<i class="block-ui__spinner fas fa-spinner"></i>'
        + '</div>';
    
    const blockUiElem = $(blockUiElemInnerHtml);
    
    function init() {
        $(document).on({
            ajaxStart: block,
            ajaxStop: release,
        });
    }
    
    function block() {
        blockUiElem.css('display','none');
        $('body').append(blockUiElem);
        blockUiElem.fadeIn();
    }
    
    function release() {
        blockUiElem.fadeOut(400, () => {blockUiElem.remove()});
    }

    return {
        init
    }
})();

module.exports = blockUi;