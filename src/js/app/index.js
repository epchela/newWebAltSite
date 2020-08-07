class Index {
  constructor() {
    this.config = {
      mqlMobile: window.matchMedia('(max-width: 60em)'),
      isDesktop: null,
      ticking: false
    };

    // this.init();
  }

  resizeDesktop() {
    console.log('resize desktop', 'color: red;');
  }

  resizeMobile() {
    console.log('resize mobile');
  }

  update() {
    console.log('update');
  }

  handleResize() {
    if (!this.config.ticking) {
      requestAnimationFrame(() => {
        if (this.config.mqlMobile.matches) {
          //  mobile
          if (this.config.isDesktop) {
            this.config.isDesktop = false;
            this.resizeMobile();
          }
        } else {
          // desktop
          if (!this.config.isDesktop) {
            this.config.isDesktop = true;
            this.resizeDesktop();
          }
        }

        this.update();

        this.config.ticking = false;
      });

      this.config.ticking = true;
    }
  }

  initDesktop() {
    console.log('init desktop');
  }

  initMobile() {
    console.log('init mobile');
  }

  handleInit() {
    if (this.config.isDesktop) {
      this.initDesktop();
    } else {
      this.initMobile();
    }

  }

  addEvents() {
    window.addEventListener('DOMContentLoaded', this.handleInit.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  init() {
    this.config.isDesktop = !this.config.mqlMobile.matches;
    this.addEvents();
  }
}

export default Index;