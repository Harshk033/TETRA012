import React, { useState } from 'react';
import {
  X, Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, 
  Edit3, Save, Check, ArrowRight
} from 'lucide-react';
import { ocrService, ExtractedReportData } from '../services/ocrService';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface OCRScannerModalProps {
  onClose: () => void;
  onSaveReportData: (extracted: ExtractedReportData) => void;
  language?: LanguageCode;
}

export const OCRScannerModal: React.FC<OCRScannerModalProps> = ({
  onClose,
  onSaveReportData,
  language = 'English',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [extractedData, setExtractedData] = useState<ExtractedReportData | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsScanning(true);
    setScanProgress(10);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 200);

    try {
      const data = await ocrService.processLabReport(selectedFile);
      setScanProgress(100);
      setTimeout(() => {
        setIsScanning(false);
        setExtractedData(data);
      }, 300);
    } catch (err) {
      setIsScanning(false);
      alert('Error parsing OCR document');
    }
  };

  const handleParamChange = (idx: number, field: string, val: string) => {
    if (!extractedData) return;
    const updated = { ...extractedData };
    updated.parameters[idx] = { ...updated.parameters[idx], [field]: val };
    setExtractedData(updated);
  };

  const handleComplete = () => {
    if (extractedData) {
      onSaveReportData(extractedData);
      alert('OCR Extracted Report Saved & Synced with Clinical Risk Prediction Engine!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#2F2E68] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E4F8] dark:border-[#7A63D9]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {t.ocrScannerTitle}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-semibold">
              {t.ocrScannerSub}
            </span>
          </div>
        </div>

        {/* Dropzone */}
        {!extractedData && !isScanning && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#B595FF] dark:border-[#7A63D9] rounded-2xl p-8 text-center bg-slate-50 dark:bg-[#1D2048] hover:bg-indigo-50/50 dark:hover:bg-[#1D2048]/80 transition-all cursor-pointer relative"
          >
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileInput}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-[#6E59CF]/10 text-[#6E59CF] dark:text-[#A379F8] flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-1">
              {t.dragDropReport}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {t.supportsReportTypes}
            </p>
            <button className="px-4 py-2 rounded-xl bg-[#6E59CF] text-white text-xs font-bold shadow-sm pointer-events-none">
              {t.browseLocalFiles}
            </button>
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <RefreshCw className="w-10 h-10 text-[#6E59CF] dark:text-[#A379F8] animate-spin mb-4" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
              {t.processingOcr} ({scanProgress}%)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
              {t.ocrScanningDesc}
            </p>
            <div className="w-64 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6E59CF] h-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Extracted Parameters Table */}
        {extractedData && (
          <div className="animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-[#6E59CF]/10 dark:bg-[#5E4EB4]/30 border border-[#B595FF]/30 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#6E59CF] dark:text-[#A379F8] block">
                  Document: {extractedData.fileName}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {extractedData.labName} • Confidence: {extractedData.confidenceScore}%
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {t.verifiedTag}
              </span>
            </div>

            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-3">
              {t.extractedParamsTitle}
            </h4>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-black">
                    <th className="py-2 px-2">{t.parameterHeader}</th>
                    <th className="py-2 px-2">{t.valueHeader}</th>
                    <th className="py-2 px-2">{t.unitHeader}</th>
                    <th className="py-2 px-2">{t.refRangeHeader}</th>
                    <th className="py-2 px-2 text-right">{t.statusHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {extractedData.parameters.map((param, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                        {param.parameter}
                      </td>
                      <td className="py-3 px-2 font-mono-num font-bold">
                        <input
                          type="text"
                          value={param.value}
                          onChange={(e) => handleParamChange(idx, 'value', e.target.value)}
                          className="w-16 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="py-3 px-2 text-slate-500 dark:text-slate-400">
                        {param.unit}
                      </td>
                      <td className="py-3 px-2 text-slate-500 dark:text-slate-400">
                        {param.referenceRange}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {param.isAbnormal ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-extrabold text-[10px]">
                            {t.highFlag}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px]">
                            {t.normalFlag}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setExtractedData(null);
                  setFile(null);
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {t.scanAnotherFile}
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 py-3 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.saveToProfile}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
