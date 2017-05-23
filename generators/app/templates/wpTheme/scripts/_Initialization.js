/*
// All classes should be imported before you instantiate them. The example below shows syntax
import ClassName from './ClassName';

new ClassName(params);
*/

class Initialization {
  constructor() {
    this.BASEURL = $('#baseurl').html();

    window.onload = this.onLoad();
    window.onresize = () => {
      // on resize events
    }
  }

  onLoad() {
    /**
     * INITIALIZATION
     */
    //remove preloader
    $('.page-preloader').remove();
    $('body').removeClass('loading');

    //Initialize Foundation
    $(document).foundation();

    /**
     * EXTERNAL CLASSES
     *
     * if(element.length){
     *   new ClassName(element);
     * }
     *
     **/

  }
}

export default Initialization;