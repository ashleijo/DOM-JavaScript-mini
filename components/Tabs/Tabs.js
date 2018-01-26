
class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    this.element.classList.add('Tabs__item-selected');
  }

  deselect() {
    // should use classList
    this.element.classList.remove('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element; // attach dom element to object
    this.tabItem = this.getTab(element.dataset);
    this.tabItem = new TabItem(this.tabItem);
  };

  select() {
    // select this link
    // select the associated tab
    this.element.classList.add('Tabs__link-selected');
    this.tabItem.select();
  }

  deselect() {
    // deselect this link
    // deselect the associated tab
    this.element.classList.remove('Tabs__link-selected');
    this.tabItem.deselect();
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return Array.from(this.element.parentNode.parentNode.querySelectorAll('.Tabs__item')).find((item) => {
      return item.dataset.tab === data.tab;
    });
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      const newLink = new TabLink(link);
      link.addEventListener('click', () => {
        // console.log('clicked!');
        this.updateActive(newLink);
        newLink.select();
      });
      return newLink;
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
    this.activeLink.deselect();
    this.activeLink = newActive;
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
