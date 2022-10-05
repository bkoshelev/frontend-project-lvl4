import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="my-4 overflow-hidden rounded  container">
        <h1>{t("errorPage.title")}</h1>
        <p>{t("errorPage.body")}</p>
        <p></p>
      </div>
    </>
  );
};
