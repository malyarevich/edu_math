<?php
	$page = $_POST['page'];
	$include = '';
	if (substr($page, 0, 5) == 'level') {
		$include = 'assets/includes/levels/'.$page.'.php';
	} else {
		$include = 'assets/includes/'.$page.'.php';
	}
	$phpdata = include ($include);
	//$json_data = json_encode($phpdata);
	echo $phpdata;
?>