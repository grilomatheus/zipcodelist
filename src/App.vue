<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
  name: 'App'
}
</script>

<style>
  body{
    font-family: 'SimplonRegular', sans-serif;
  }
  @font-face {
    font-family: 'Billionthine';
    src: url('./assets/fonts/billionthine.otf'),
         url('./assets/fonts/billionthine.ttf')  format('truetype')
  }
  @font-face {
    font-family: 'SimplonHeadLine';
    src: url('./assets/fonts/simplon-headline.eot');
    src: url('./assets/fonts/simplon-headline.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/simplon-headline.woff') format('woff'),
         url('./assets/fonts/simplon-headline.ttf')  format('truetype'),
         url('./assets/fonts/simplon-headline.svg#svgFontName') format('svg');
  }
  @font-face {
    font-family: 'SimplonRegular';
    src: url('./assets/fonts/simplon-regular.eot');
    src: url('./assets/fonts/simplon-regular.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/simplon-regular.woff') format('woff'),
         url('./assets/fonts/simplon-regular.svg#svgFontName') format('svg');
  }
  @font-face {
    font-family: 'SimplonMedium';
    src: url('./assets/fonts/simplon-medium.eot');
    src: url('./assets/fonts/simplon-medium.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/simplon-medium.woff') format('woff'),
         url('./assets/fonts/simplon-medium.ttf')  format('truetype'),
         url('./assets/fonts/simplon-medium.svg#svgFontName') format('svg');
  }
  @font-face {
    font-family: 'SimplonLight';
    src: url('./assets/fonts/simplon-light.eot');
    src: url('./assets/fonts/simplon-light.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/simplon-light.woff') format('woff'),
         url('./assets/fonts/simplon-light.ttf')  format('truetype'),
         url('./assets/fonts/simplon-light.svg#svgFontName') format('svg');
  }
  @font-face {
    font-family: 'SimplonBold';
    src: url('./assets/fonts/simplon-bold.eot');
    src: url('./assets/fonts/simplon-bold.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/simplon-bold.woff') format('woff'),
         url('./assets/fonts/simplon-bold.ttf')  format('truetype'),
         url('./assets/fonts/simplon-bold.svg#svgFontName') format('svg');
  }

</style>
