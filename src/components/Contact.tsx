import { useState, ChangeEvent, FormEvent } from "react";

// フォームデータの型定義
type ContactData = {
  name: string;
  email: string;
  message: string;
};

// エラー型定義（各フィールドがある場合はstring、ない場合はundefined）
type ErrorMessages = Partial<Record<keyof ContactData, string>>;

export const ContactPage = () => {
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    email: '',
    message: ''
  });

  const [error, setError] = useState<ErrorMessages>({});
  const [submit, setSubmit] = useState<boolean>(false);

  const changeEvent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setContactData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validation = () => {
    const valueErrors: ErrorMessages = {};
    if (!contactData.name) valueErrors.name = 'お名前は必須です。';
    if (!contactData.email) valueErrors.email = 'メールアドレスは必須です。';
    if (!contactData.message) valueErrors.message = '本文は必須です。';
    setError(valueErrors);
    return Object.keys(valueErrors).length === 0;
  };

  const submitButton = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation()) return;

    setSubmit(true);
    try {
      const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      alert('送信しました');
      setContactData({ name: '', email: '', message: '' });
      setError({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmit(false);
    }
  };

  const handleClear = () => {
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <div className='App'>
      <div className="contact_form">
        <h1 className="contact_form_title">問合わせフォーム</h1>
        <form className="contact_form_wrap" onSubmit={submitButton}>
          <div className="formItem">
            <label>
              <dl>
                <dt>お名前</dt>
                <dd className="text">
                  <input
                    type="text"
                    id="name"
                    maxLength={30}
                    value={contactData.name}
                    onChange={changeEvent}
                    disabled={submit}
                  />
                </dd>
                {error.name && <span>{error.name}</span>}
              </dl>
            </label>
            <div className="label">
              <label>
                <dl>
                  <dt>メールアドレス</dt>
                  <dd className="text">
                    <input
                      type="text"
                      id="email"
                      value={contactData.email}
                      onChange={changeEvent}
                      disabled={submit}
                    />
                  </dd>
                  {error.email && <span>{error.email}</span>}
                </dl>
              </label>
            </div>
            <div className="label">
              <label>
                <dl>
                  <dt>本文</dt>
                  <dd className="text">
                    <textarea
                      id="message"
                      maxLength={500}
                      rows={10}
                      value={contactData.message}
                      onChange={changeEvent}
                      disabled={submit}
                    />
                  </dd>
                  {error.message && <span>{error.message}</span>}
                </dl>
              </label>
            </div>
          </div>
          <div className="btn">
            <input type="submit" value="送信" disabled={submit} />
            <input type="reset" value="クリア" onClick={handleClear} disabled={submit} />
          </div>
        </form>
      </div>
    </div>
  );
};
