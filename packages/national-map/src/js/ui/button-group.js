import Mustache from "mustache";

export function ButtonGroup({ root, buttons, onSelect }) {
  const template = document.getElementById("buttonGroupTemplate").innerHTML;

  function init() {
    render();
    const buttons = root.querySelectorAll("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        const activeButton = root.querySelector(".button--active");
        if (activeButton === this) return;
        activeButton.classList.remove("button--active");
        this.classList.add("button--active");
        onSelect && onSelect(event, this);
      });
    }
  }

  function render() {
    root.innerHTML = Mustache.render(template, { buttons });
  }

  init();

  return {
    render,
    root,
  };
}
