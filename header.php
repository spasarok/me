<head>
    <title><?php the_title(); ?></title>

    <!-- wp_head -->
    <?php wp_head(); ?>
</head>

<body>

<header>
    <div class="container">
        <h1>Kim Spasaro</h1>
    </div>
    <nav class="container">
        <?php wp_nav_menu(array('theme_location' => 'header-menu' )); ?>
    </nav>
</header>