<?php
	
/*
Plugin Name: Just Animate - For Classic Editor
Plugin URI: http://ja.sigalitam.com/
Description: Just Animate is a WordPress plugin for Animate blocks and text in your posts or pages, and easily create beautiful posts with animations.
Version: 1.0
Author: Sigalitam
Author URI: http://sigalitam.com
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: just-animate
*/

// GUTENBERG_OR_TINYMCE
function sigja_is_gutenberg_editor() {
    global $current_screen;
    $current_screen = get_current_screen();
    if ( method_exists($current_screen, 'is_block_editor') && $current_screen->is_block_editor() ) {
        // GUTENBERG EDITOR
    } else {
        // OLD EDITOR TINYMCE 
        add_action('admin_head', 'sigja_add_editor_button');
        function sigja_add_editor_button() {
            global $typenow;
            if (!current_user_can('edit_posts') && !current_user_can('edit_pages') ) { return; }
            if( ! in_array( $typenow, array( 'post', 'page' ) ) ){ return; }
            if ( get_user_option('rich_editing') == 'true') {
                add_filter("mce_external_plugins", "sigja_add_tinymce_plugin");
                add_filter('mce_buttons', 'sigja_register_editor_button');
            }
        }
        function sigja_add_tinymce_plugin($plugin_array) {
            $plugin_array['sigja_button'] = plugins_url( '/js/animate.js', __FILE__ );
            return $plugin_array;
        }
        function sigja_register_editor_button($buttons) {
            array_push($buttons, "sigja_button");
            return $buttons;
        }
    }      
}
add_action( 'admin_enqueue_scripts', 'sigja_is_gutenberg_editor' );

 // WP ADMIN STYLE
 function sigja_admin_style() {
    wp_enqueue_style('sigjan-admin_css', plugins_url('/css/admin-style.css', __FILE__));
}
add_action('admin_enqueue_scripts', 'sigja_admin_style');


// WP OLD EDITOR STYLE
function sigja_editor_style() {
    add_editor_style( plugins_url('/css/editor-style.css', __FILE__)  );
}
add_action( 'init', 'sigja_editor_style' );


 // WP FRONT STYLE
 function sigja_front_end_style() {
    wp_enqueue_style('sigjan-front_css', plugins_url('/css/style.css', __FILE__));
    wp_enqueue_script( 'sigjan-front_js', plugins_url('/js/onscroll.js', __FILE__), array ( 'jquery' ), 1.1, true);
}
add_action('wp_enqueue_scripts', 'sigja_front_end_style');


// VERSION CHECK
function sigja_check_wp_version() {
	global $pagenow;
	if ( $pagenow == 'plugins.php' && is_plugin_active('just-animate/just-animate.php') ):
		$wp_version = get_bloginfo('version');

        $tested_range = array(5.0, 5.5);
        if( (float)$wp_version >= (float)$tested_range[0] && (float)$wp_version <= (float)$tested_range[1]){
        } else {
            $notice = sigja_get_admin_notice('Just Animate plugin has not been tested in your version of WordPress. It still may work though...','error');
			echo( $notice );
        }
	endif;
}
function sigja_get_admin_notice( $message, $class ) {
	$output = '';
	try { $output = '
		 <div class="'. $class .'">
		    <p>'. $message .'</p>
		</div>
		';
	} catch( Exception $e ) {}
	return $output;
}
add_action( 'admin_notices', 'sigja_check_wp_version' );
