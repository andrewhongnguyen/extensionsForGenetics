chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		function alleleObj(alleleName, alleleDesc, alleleTags){
			this.alleleName = alleleName;
			this.alleleDesc = alleleDesc;
			this.alleleTags = alleleTags;
		}
		function panelObj(genotype, grade, status, alleleArray){
			this.genotype = genotype;
			this.grade = grade;
			this.status = status;
			this.alleleArray = alleleArray;
		}
		function panelArrayObj(panelArray){
			this.panelArray = panelArray;
		}
		//NOTE: open multiple links to parse neccesary info

		var lifeStylePanel = new panelArrayObj([]);
		var tempPA = $('.panel').toArray();

		for(var i=0; i<tempPA.length; i++)
		{
			var tempPanelObj = new panelObj(
                	tempPA[i].getElementsByClassName('panel-title')[0].firstChild.nodeValue,
					tempPA[i].getElementsByClassName('panel-title')[0].firstElementChild.innerText,
					tempPA[i].getElementsByClassName('panel-title')[0].childNodes[2].innerText,
                    new Array(0));

			lifeStylePanel.panelArray[i] = tempPanelObj;

			var tempAN = tempPA[i].getElementsByClassName('panel-body count-body')[0].getElementsByTagName('p');
			var tempAlleleAL = tempAN.length;

			for(var j=0; j<tempAlleleAL; j++)
			{
                var tempAlleleObj = new alleleObj(0,[],[]);
                tempAlleleObj.alleleName = tempAN[j].textContent;
                var tempAlleleBlocks = tempPA[i].getElementsByClassName('panel-body count-body')[0].getElementsByTagName('ul');

				if(tempAlleleBlocks[j] == null)
				{
					break;
				}
                for (var k = 0; k < tempAlleleBlocks[j].getElementsByTagName('li').length; k++)
                {
                    tempAlleleObj.alleleDesc[k] = tempAlleleBlocks[j].getElementsByTagName('li')[k].textContent;
                    if(tempAlleleBlocks[j].getElementsByTagName('li')[k].getElementsByTagName('a')[0] == null)
					{
						break;
					}
                    tempAlleleObj.alleleTags[k] = tempAlleleBlocks[j].getElementsByTagName('li')[k].getElementsByTagName('a')[0].attributes.href.nodeValue;
				}

                lifeStylePanel.panelArray[i].alleleArray[j] = tempAlleleObj;
            }
		}

        console.log(lifeStylePanel);
	}
	}, 10);
});

