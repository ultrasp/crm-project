export class PrintUtility {

    public static print(elementId: string, styleFilesWithExtensions: string[] = []): void {
        var content = document.getElementById(elementId);
        var printer = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

        printer!.document.open();

        // To keep styling        
        styleFilesWithExtensions.forEach(fileNameWithExtension => {
            printer!.document.write(`<link rel="stylesheet" type="text/css" href="../assets/css/print-page/${fileNameWithExtension}">`);
        });

        printer!.document.write(content!.innerHTML);
        printer!.document.close();
        printer!.setTimeout(function () {
            printer!.focus();
            printer!.print();
            printer!.close();
        }, 1000);
    }
}