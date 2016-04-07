<!DOCTYPE html>
<html>
<?php get_header(); ?>

<?php $classes = "page"; ?>
<?php if(is_front_page()) $classes = $classes.' home'; ?>
<body class="<?php echo $classes; ?>">


<main>
    <div class="container">
        <h1>Lessons</h1>

        <?php while(have_posts()): the_post(); ?>
            <article>
                <h2>
                    <?php the_title(); ?>
                    <a href="<?php the_permalink(); ?>">
                        <button type="button" class="btn btn-primary btn-xs">Here!</button>
                    </a>
                </h2>
                <?php the_field('kim_lesson_summary'); ?>
            <article>
        <?php endwhile?>
    </div>
</main>
<?php get_footer(); ?>
</body>
</html>