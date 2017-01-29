window.onload = function () {

    var isToggleBlockShown = false;

    $("#nav-toggler").click(function () {
        checkToggleBlock();
    });

    var $toggleBlock = $("#toggle-block");

    function checkToggleBlock() {
        // вдруг))))
        if (window.innerWidth > 992) {
            return false;
        }
        if ($toggleBlock.css("display") === "none") {
            showToggleBlock();
        } else {
            hideToggleBlock();
        }
    };

    function showToggleBlock() {
        $toggleBlock.css("display", "block");
        isToggleBlockShown = true;
    }

    function hideToggleBlock() {
        $toggleBlock.css("display", "none");
        isToggleBlockShown = false;
    }

}