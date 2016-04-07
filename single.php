<!DOCTYPE html>
<html>
<?php get_header(); ?>

<?php $classes = "single"; ?>
<body class="<?php echo $classes; ?>">

<?php while(have_posts()): the_post(); ?>
    <main>
        <div class="container">
            <h1><?php the_title(); ?></h1>


            <?php the_content(); ?>
    </main>
<?php endwhile?>
<?php get_footer(); ?>
</body>
</html>