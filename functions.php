<?php

// Enqueue jQuery
function kim_enqueue_scripts() {
    $dir = get_template_directory_uri();
    wp_enqueue_script('jquery');
    wp_enqueue_style('kim_main_style', $dir.'/style.css');
    wp_enqueue_style('bootstrap', get_template_directory_uri().'/lib/bootstrap-3.3.6/css/bootstrap.min.css');
}
add_action('wp_enqueue_scripts', 'kim_enqueue_scripts');

// Menus
function register_my_menus(){
    register_nav_menus(
        array('header-menu' => __('Header Menu'))
    );
}
add_theme_support('menus');
add_action('init', 'register_my_menus');


// Post types
function kim_post_types() {
    register_post_type('kim_lesson',
        array(
            'labels' => array(
                'name' => __('Lessons'),
                'singular_name' => __('Lessons')
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'lessons')
        )
    );
    register_post_type('kim_resume_item',
        array(
            'labels' => array(
                'name' => __('Resume'),
                'singular_name' => __('Resume')
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'resume')
        )
    );
}
add_action( 'init', 'kim_post_types' );

// Taxonomies
function kim_taxonomies() {
    $resume_categories = array(
        'name'              => _x( 'Resume Category', 'taxonomy general name' ),
        'singular_name'     => _x( 'Resume Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Resume Categories' ),
        'all_items'         => __( 'All Resume Categories' ),
        'parent_item'       => __( 'Parent Resume Category' ),
        'parent_item_colon' => __( 'Parent Resume Category:' ),
        'edit_item'         => __( 'Edit Resume Category' ),
        'update_item'       => __( 'Update Resume Category' ),
        'add_new_item'      => __( 'Add New Resume Category' ),
        'new_item_name'     => __( 'New Resume Category' ),
        'menu_name'         => __( 'Resume Category' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $resume_categories,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'resume-category' ),
    );

    register_taxonomy('resume_category', array('kim_resume_item'), $args);
}
add_action( 'init', 'kim_taxonomies', 0 );




include 'classes/formatter.php';
include 'classes/resume.php';
include 'includes/theme-options/theme-options.php';


