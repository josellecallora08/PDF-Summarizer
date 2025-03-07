# **AI-Powered PDF Summarization Website**

## **Overview**
The AI-Powered PDF Summarization Website is a web-based application that allows users to upload PDF documents and receive concise summaries generated using the Gemini API. This system enhances productivity by quickly extracting key insights from lengthy documents, making information more accessible and digestible.

## **Features**
- ✅ Upload and process PDF files
- ✅ Extract text from PDFs using `pdf-parse`
- ✅ AI-powered summarization using the Gemini API
- ✅ Simple and clean user interface
- ✅ Fast processing with Node.js and Express

## **Tech Stack**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **APIs**: Gemini API (for AI summarization)
- **File Handling**: Multer (for uploads), pdf-parse (for text extraction)

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/josellecallora08/PDF-Summarizer.git
cd PDF-Summarizer
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add your **Gemini API key**:
```sh
GEMINI_API_KEY=your_api_key_here
```

### **4. Run the Server**
```sh
node server.js
```
The backend should start on **http://localhost:3000**.

## **Usage**
1. Open the frontend in your browser.
2. Upload a PDF file.
3. The system will extract text and generate a summarized version.

## **Contributing**
Feel free to fork this project and submit pull requests with improvements or new features.

## **License**
This project is open-source and available under the [MIT License](LICENSE).
