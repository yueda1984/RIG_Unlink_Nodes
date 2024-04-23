/*	
	Unlink Nodes
	
	This Toon Boom Harmony shelf script unlinks all node connections on the selected nodes.
	When you delete a node in Harmony, the software automatically link  the parent and the child node of the deleted node.
	This script can help you to prevent that from happening. It is quite useful to use this script on nodes before deleting them.
	Compatible with Harmony 14 and Up. (Might work on 12 as well?)

	
	Installation:
	
	1) Download and Unarchive the zip file.
	2) Locate to your user scripts folder (a hidden folder):
	   https://docs.toonboom.com/help/harmony-17/premium/scripting/import-script.html	

	3) There is a folder named "src" inside the zip file. Copy all its contents directly to the folder above.
	4) In Harmony, add RIG_Unlink_Nodes funcion to any toolbar.
	
	
	Direction:
	
	1) Select node(s) in Node view.
	2) Run RIG_Unlink_Nodes.
	

	Coder:

	Yu Ueda (raindropmoment.com)		
*/

function RIG_Unlink_Nodes()
{
	var sNodes = selection.selectedNodes();

		
	scene.beginUndoRedoAccum("Unlink Nodes");		
	

	for (var idx in sNodes)
	{
		// unlink src nodes
		var numInput = node.numberOfInputPorts(sNodes[idx]);	
		for (var i = numInput -1; i >= 0 ; i--)
			node.unlink(sNodes[idx], i)	
		
		// make a list of dst nodes
		var numOutput = node.numberOfOutputPorts(sNodes[idx]);
		var dstNodeList = [];
		for (var i = 0; i < numOutput; i++)
		{
			var numOutlinks = node.numberOfOutputLinks(sNodes[idx], i);			
			for (var ii = 0; ii < numOutlinks; ii++)
				dstNodeList.push(node.dstNode(sNodes[idx], i, ii));
		}		
			
		// unlink dst nodes
		for (var i = 0; i < dstNodeList.length; i++)
		{
			var numDstInput = node.numberOfInputPorts(dstNodeList[i]);
			for (var ii = numDstInput -1; ii >= 0 ; ii--)
			{
				var curSrc = node.srcNode(dstNodeList[i], ii);			
				if (curSrc == sNodes[idx])		
					node.unlink(dstNodeList[i], ii);
			}
		}
	}
	
	
	scene.endUndoRedoAccum();	
}


/* WIP
function Pull_Out_Nodes()
{
	var sNodes = selection.selectedNodes();

		
	scene.beginUndoRedoAccum("Unlink Nodes");		
	

	for (var idx in sNodes)
	{
		// make a list of src nodes
		var srcNodeList = [];		
		var numInput = node.numberOfInputPorts(sNodes[idx]);	
		for (var i = numInput -1; i >= 0 ; i--)
			srcNodeList.push(sNodes[idx], i);
		
		// make a list of dst nodes
		var numOutput = node.numberOfOutputPorts(sNodes[idx]);
		var dstNodeList = [];
		for (var i = 0; i < numOutput; i++)
		{
			var numOutlinks = node.numberOfOutputLinks(sNodes[idx], i);			
			for (var ii = 0; ii < numOutlinks; ii++)
				dstNodeList.push(node.dstNode(sNodes[idx], i, ii));
		}
		
		// unlink src nodes	
		for (var i = numInput -1; i >= 0 ; i--)
			node.unlink(sNodes[idx], i)
	
		// unlink dst nodes
		for (var i = 0; i < dstNodeList.length; i++)
		{
			var numDstInput = node.numberOfInputPorts(dstNodeList[i]);
			for (var ii = numDstInput -1; ii >= 0 ; ii--)
			{
				var curSrc = node.srcNode(dstNodeList[i], ii);			
				if (curSrc == sNodes[idx])			
					node.unlink(dstNodeList[i], ii);
			}
		}
		
		// link src and dst of the selected nodes together
		for (var i = 0; i < srcNodeList.length; i++)
			for (var ii = 0; ii < dstNodeList.length; ii++)
				node.link(srcNodeList[i], 0, dstNodeList[ii], 0);				
	}
	
	
	scene.endUndoRedoAccum();	
}*/