<?php
/**
 * Footer
 *
 * This is the template that displays default footer.
 *
 * @package <%= name %>
 */
?>
<script id="baseurl" type="text/template-baseurl"><?php echo BASEURL; ?></script>

<noscript id="deferred-styles">
    <!-- build:css(.) styles/app.css -->
    <!-- inject:regular:css -->
    <!-- endinject -->
    <!-- endbuild -->
</noscript>

<!-- build:js(.) scripts/packed.js -->
<!-- bower:js -->
<!-- endbower -->
<!-- inject:js -->
<!-- endinject -->
<!-- endbuild -->

<?php wp_footer(); ?>

</body>
</html>