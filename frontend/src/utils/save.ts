import html2canvas from 'html2canvas';

interface ScreenshotCaptureOptions {
  rootElementId: string;
}

export const captureScreenshot = ({ rootElementId }: ScreenshotCaptureOptions): void => {

  const rootElement = document.getElementById(rootElementId);

  if (!rootElement) {
    alert(`Root element with ID ${rootElementId} not found.`);
    return;
  }


  html2canvas(rootElement).then((canvas) => {
    
    const dataURL = canvas.toDataURL();


    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'screenshot.png';

    downloadLink.click();
  });
};
