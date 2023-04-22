<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */


function hello_elementor_child_enqueue_scripts() {
    // Enqueue parent stylesheet
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    
    // Enqueue child stylesheet
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/assets/css/main.css', array( 'parent-style' ), '1.0.0' );
    
    // Enqueue custom JavaScript file
    wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri() . '/assets/js/main.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts' );



/*custom post type*/
add_action('init', 'create_custom_post_type');
 
function create_custom_post_type() {
 
$supports = array(
'title', // post title
'editor', // post content
'author', // post author
'thumbnail', // featured images
'excerpt', // post excerpt
'custom-fields', // custom fields
'comments', // post comments
'revisions', // post revisions
'post-formats', // post formats
);
 
$labels = array(
'name' => _x('Services', 'plural'),
'singular_name' => _x('Service', 'singular'),
'menu_name' => _x('Our Services', 'admin menu'),
'name_admin_bar' => _x('Our Services', 'admin bar'),
'add_new' => _x('Add New', 'add new'),
'add_new_item' => __('Add New'),
'new_item' => __('New Service'),
'edit_item' => __('Edit Service'),
'view_item' => __('View Service'),
'all_items' => __('All Services'),
'search_items' => __('Search Service'),
'not_found' => __('No Service found.'),
);
 
$args = array(
'supports' => $supports,
'labels' => $labels,
'description' => 'Holds our Service and specific data',
'public' => true,
'taxonomies' => array( 'category', 'post_tag' ),
'show_ui' => true,
'show_in_menu' => true,
'show_in_nav_menus' => true,
'show_in_admin_bar' => true,
'can_export' => true,
'capability_type' => 'post',
 'show_in_rest' => true,
'query_var' => true,
'rewrite' => array('slug' => 'Service'),
'has_archive' => true,
'hierarchical' => false,
'menu_position' => 6,
'menu_icon' => 'dashicons-megaphone',
);
 
register_post_type('Service', $args); // Register Post type
}