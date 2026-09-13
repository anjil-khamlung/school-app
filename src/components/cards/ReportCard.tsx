interface ReportCardProps {
  value1:number,
  value2:number,
  value3:number,
  title:string,
  description:string,
  rowTitle1:string,
  rowTitle2:string,
  rowTitle3:string,
}

const ReportCard = ({
  value1,
  value2,
  value3,
  title,
  description,
  rowTitle1,
  rowTitle2,
  rowTitle3,
}:ReportCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-bold text-slate-900">{title} </h2>

      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">{rowTitle1}</span>

          <span className="font-semibold text-slate-900">{value1}</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">{rowTitle2}</span>

          <span className="font-semibold text-slate-900">{value2}</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
          <span className="text-sm text-slate-500">{rowTitle3}</span>

          <span className="font-semibold text-slate-900">{value3}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
