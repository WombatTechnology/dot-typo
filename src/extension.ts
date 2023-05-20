// src/extension.ts
import * as vscode from "vscode"
import * as fs from "fs"
import * as path from "path"
export function activate(context: vscode.ExtensionContext) {
  const configPath = path.join(vscode.workspace.rootPath!, ".typo")

  if (!fs.existsSync(configPath)) {
    // Display a message box with the option to create a .typo file.
    vscode.window
      .showInformationMessage(
        ".typo file does not exist in your workspace. Please create to enable typo fixing.",
        "Create .typo file"
      )
      .then((option) => {
        const template = `{
  "const": ["cosnt"],
  "import": ["improt", "imporet"]
}
`
        if (option === "Create .typo file") {
          fs.writeFileSync(configPath, template, "utf8")
        }
      })
  }

  const fixTypo = vscode.workspace.onDidSaveTextDocument(
    async (document: vscode.TextDocument) => {
      const activeEditor = vscode.window.activeTextEditor

      if (
        !activeEditor ||
        document.uri.toString() !== activeEditor.document.uri.toString() ||
        path.basename(document.uri.fsPath) === ".typo"
      ) {
        return
      }

      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"))
        const workspaceEdit = await calcWorkspaceEdit(document, config)

        // Apply the workspace edit
        await vscode.workspace.applyEdit(workspaceEdit)
      } catch (err) {
        console.error(err)
      }
    }
  )
  context.subscriptions.push(fixTypo)
}

async function calcWorkspaceEdit(
  document: vscode.TextDocument,
  config: { [key: string]: string[] }
) {
  const workspaceEdit = new vscode.WorkspaceEdit()

  for (const correctWord in config) {
    const typos = config[correctWord]
    typos.forEach((typo) => {
      const regex = new RegExp(`\\b${typo}\\b`, "g")

      let match
      while ((match = regex.exec(document.getText()))) {
        const startPos = document.positionAt(match.index)
        const endPos = document.positionAt(match.index + typo.length)

        workspaceEdit.replace(
          document.uri,
          new vscode.Range(startPos, endPos),
          correctWord
        )
      }
    })
  }

  return workspaceEdit
}

export function deactivate() {}
