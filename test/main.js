Vue.component('rows', {
  data: function() {
    return {
      isHidden: true
    }
  },
  template: 
  `<tbody :class="{ hidden: isHidden }">
    <tr>
      <td>a</td>
      <td>b</td>
      <td>c</td>
      <td>d
      <a @click="changeVisible" class="btn btn-primary" href="#" role="button">Link</a></td>
    </tr>
    <tr>
        <td>e</td>
        <td>f</td>
        <td>g</td>
        <td>h</td>
    </tr>
    <tr>
        <td>i</td>
        <td>j</td>
        <td>k</td>
        <td>l</td>
    </tr>
    <tr>
        <td>m</td>
        <td>n</td>
        <td>o</td>
        <td>p</td>
    </tr>
  </tbody>`, 
  methods: {
    changeVisible() {
      this.isHidden === true ? this.isHidden = false : this.isHidden = true;
    }
  }
})


new Vue({
  el: "#app",
 
});




