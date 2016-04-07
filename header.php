<head>
    <title><?php the_title(); ?></title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/lib/bootstrap-3.3.6/css/bootstrap.min.css">

    <!-- Heading font -->
    <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>

    <!-- wp_head() -->
    <?php wp_head(); ?>
</head>

<header>
    <div class="container">
        <h1>Kim Spasaro</h1>
    </div>
    <nav class="container">
        <?php wp_nav_menu(array('theme_location' => 'header-menu' )); ?>
    </nav>
</header>