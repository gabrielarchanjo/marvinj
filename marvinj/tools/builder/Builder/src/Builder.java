import java.io.File;
import java.io.IOException;

import javax.swing.filechooser.FileNameExtensionFilter;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;


public class Builder {

	public Builder(String path){
		
		StringBuilder finalContent = new StringBuilder();
		
		try {
			File rootPath = new File(path);
			appendFiles(rootPath, finalContent);
			finalContent.append(FileUtils.readFileToString(new File(rootPath.getAbsoluteFile()+"\\MarvinFramework.js")));
			File fileOut = new File("./marvinjs-x.y.js");
			FileUtils.write(fileOut, finalContent);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void appendFiles(File dir, StringBuilder finalContent) throws IOException{
		
		File[] files = dir.listFiles();
		
		for(File f:files){
			if(f.isDirectory()){
				appendFiles(f, finalContent);
			}
			else if(FilenameUtils.getExtension(f.getName()).equals("js") && !f.getName().equals("MarvinFramework.js")){
				String content = FileUtils.readFileToString(f);
				finalContent.append("\n");
				finalContent.append(content);
			}
		}
	}

	public static void main(String args[]){
		new Builder(args[0]);
		System.exit(0);
	}
}


