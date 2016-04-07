<!DOCTYPE html>
<html>
<?php get_header(); ?>

<main class="page">
    <div class="container">
        <?php while(have_posts()): the_post(); ?>
            <h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
        <?php endwhile?>
    </div>
</main>

<?php get_footer(); ?>
</body>
</html>