
<div class="progress" id="score-bar" style="display:none">
	<div class="progress-bar progress-bar-success progress-bar-striped" id="correct-bar" style="width: 0%;"></div>
	<div class="progress-bar progress-bar-danger progress-bar-striped" id="incorrect-bar" style="width: 0%"></div>
	<div class="progress-bar progress-bar-warning progress-bar-striped" id="timeout-bar" style="width: 0%"></div>
</div>
<div class="panel panel-default" id="result" style="display:none">
	<div class="panel-body">
		<h3 class="control-title">Your result</h3>
		<h4>Test of <text id="testNumber"></text></h4>
		<div id="valRes"></div>
		<center>
			<a class="link" id="repeatLevel" href="javascript:void(0)">
				<div id="divglyphicon">
					<span class="glyphicon glyphicon-repeat spanglyphicon"></span>
				</div>
			</a>
			<a class="btn btn-info link" href="#index">
				Go to main!
			</a>
		</center>
	</div>
</div>
<div class="panel panel-default" id="aboutInfo" style="display:none">
	<div class="panel-body">
		<h4>Print your results.</h4>
		<p>Use <kbd>ctrl + p</kbd> to open the Print dialog box.</p>
	</div>
</div>