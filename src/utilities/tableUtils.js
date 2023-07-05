// Capitalize Table Headings
export const capitalizeFirst = (str) => {
  let misc = str.replaceAll("_", " ");
  misc = misc.split(" ");
  let capitalized = misc.map((str) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  });
  return capitalized.join(" ");
};

export const attributes = [
  "enabled",
  "is_fiu",
  "license_start_date",
  "license_end_date",
  "allowed_ip_list_csv",
  "encryption_enabled",
  "computed_itypes",
  "use_custom_css_for_widgets",
  "plan_type",
  "api_level",
  "user_limit",
  "auto_update_limit",
  "asset_class_subscribed",
  "feature_subscribed_to",
];

export const details = [
  "enc_key",
  "dec_key",
  "redirection_url",
  "widgets_subscribed",
  "send_invoice_mis_report",
  "invoice_type",
  "mis_frequency",
  "invoice_emails_csv",
  "callback_enabled",
  "autoupdate_callback_url",
  "statement_callback_url",
  "callback_headers_json",
  "transaction_callback_enabled",
  "max_months_of_data_to_fetch",
  "show_drill_down_category",
  "show_transfer_category",
];

export const groups = [
  "computed_itypes",
  "asset_class_subscribed",
  "feature_subscribed_to",
];

export const booleans = [
  "enabled",
  "is_fiu",
  "encryption_enabled",
  "use_custom_css_for_widgets",
  "send_invoice_mis_report",
  "callback_enabled",
  "transaction_callback_enabled",
  "show_drill_down_category",
  "show_transfer_category",
];

export const computedItypes = [
  "bank",
  "cc",
  "mf",
  "eq",
  "loan",
  "fd",
  "utility",
  "cr",
];

export const assetClasses = [
  "bank",
  "cc",
  "mf",
  "eq",
  "loan",
  "fd",
  "utility",
  "cr",
];

export const features = [
  "StatementUpload",
  "Categories",
  "Budget",
  "Reports",
  "Goals",
];

{
  /* <Field name={atr}>
                        {({ input }) => (
                          <>
                            <label>{capitalizeFirst(atr)}</label>
                            {booleans.includes(atr) ? (
                              <CheckBox
                                checked={values[atr] === 1 ? true : false}
                              />
                            ) : (
                              <input {...input} />
                            )}
                          </>
                        )}
                      </Field> */
}
