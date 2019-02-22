<head>
    <meta charset="UTF-8">
    <title><?= $siteTitle ?></title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif+JP|Poppins:400,700,800" rel="stylesheet">

    <?php if ($siteName === 'landing-page') { ?>
        <link rel="stylesheet" href="/css/landing-page-bundled.css">    
    <?php } else if ($siteName === 'contact-page') { ?>
        <link rel="stylesheet" href="/css/contact-page-bundled.css">
    <?php } else if ($siteName === 'article-page') { ?>
        <link rel="stylesheet" href="/css/article-page-bundled.css">
    <?php } else if ($siteName === 'blog-page') { ?>
        <link rel="stylesheet" href="/css/blog-page-bundled.css">
    <?php } ?>
</head>