<article class="resume-item">
    <?php $icon = get_field('kim_resume_icon'); ?>
    <img class="icon" src="<?php echo $icon['url']; ?>" alt="<?php echo $image['alt']; ?>">
    <?php if(get_field('kim_first_item')): ?>
        <time class="year"><?php echo DateTime::createFromFormat('F Y', get_field('kim_resume_start'))->format('Y'); ?></time>
    <?php endif; ?>
    <div class="bullet"><div class="bullet-inner"></div></div>
    <div class="details">
        <div class="position"><?php the_title(); ?></div>
        <div class="employer"><?php the_field('kim_resume_employer'); ?></div>
        <time>
            <?php the_field('kim_resume_start'); ?>
            <?php if(get_field('kim_resume_present')): ?>
                <?php echo ' - Present'; ?>
            <?php elseif(get_field('kim_resume_end')): ?>
                <?php echo ' - '.get_field('kim_resume_end'); ?>
            <?php endif; ?>
        </time>
        <?php edit_post_link(); ?>
    </div>
</article>