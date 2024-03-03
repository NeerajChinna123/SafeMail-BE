from joblib import load
import sys


# Load the models and vectorizers
random_forest = load('random_forest.pkl')
logistic_regression = load('logistic_regression.pkl')
naive_bayes = load('naive_bayes.pkl')
tfidf_vectorizer = load('tfidf_vectorizer.pkl')
count_vectorizer = load('count_vectorizer.pkl')

# Assuming `new_data` is your new input data in the same format as your training data
# new_data = sys.stdin.read().strip()
new_data = [sys.stdin.read().strip()]

# new_data = ['Due security reasons we may have to close your bank account Dear Sir/Madam,&lt;br&gt;</p><p>&lt;br&gt;</p><p>Barclays Bank PLC.</p><p>always look forward for the high security of our clients. Some</p><p>customers have been receiving an email claiming to be from</p><p>Barclays advising them to follow a link to what appear to be a</p><p>Barclays web site, where they are prompted to enter their</p><p>personal Online Banking details. Barclays is in no way involved</p><p>with this email and the web site does not belong to us.&lt;/font&gt;&lt;/p&gt;</p><p>&lt;p&gt;&lt;font color"#003366" face"Arial" size"2"&gt;Barclays is proud</p><p>to announce about their new updated secure system. We updated</p><p>our new SSL servers to give our customers a better, fast and</p><p>secure online banking service.&lt;br&gt;</p><p>&lt;br&gt;</p><p>Due to the recent update of the servers, you are requested to</p><p>please update your account info at the following link.&lt;/font&gt;&lt;/p&gt;</p><p>&lt;p&gt;&lt;b&gt;&lt;font face"Arial" size"2"&gt;</p><p>&lt;a href"<a href="http://s01060012174cb1cd.vs.shawcable.net/ibank.barclays.co.uk/olb/p/LoginMember.do/index.html">http://s01060012174cb1cd.vs.shawcable.net/ibank.barclays.co.uk/olb/p/LoginMember.do/index.html</a>"&gt;</p><p>&lt;font color"#00A8DC"&gt;</p><p><a href="https://update.barclays.co.uk/olb/p/LoginMember.do%3C/font%3E%3C/a%3E%3C/font%3E%3C/b%3E%3C/p%3E">https://update.barclays.co.uk/olb/p/LoginMember.do&lt;/font&gt;&lt;/a&gt;&lt;/font&gt;&lt;/b&gt;&lt;/p&gt;</a></p><p>&lt;p&gt;&lt;font color"#003366" face"Arial" size"2"&gt;&lt;b&gt;*Important*&lt;/b&gt;&lt;br&gt;</p><p>We have asked few additional information which is going to be</p><p>the part of secure login process. These additional information</p><p>will be asked during your future login security so, please</p><p>provide all these info completely and correctly otherwise due to</p><p>security reasons we may have to close your bank account temporarily.&lt;br&gt;</p><p>&lt;br&gt;</p><p>&amp;nbsp;&lt;/font&gt;&lt;/p&gt;</p><p>&lt;p&gt;&lt;font face"Arial" size"2"&gt;&lt;font color"#003366"&gt;&lt;b&gt;J. S.</p><p>Smith&lt;/b&gt;&lt;br&gt;</p><p>&lt;i&gt;Security Advisor&lt;br&gt;</p><p>Barclays Bank PLC.&lt;/i&gt;&lt;/font&gt;&lt;br&gt;</p><p>&amp;nbsp;&lt;/font&gt;&lt;/td&gt;</p><p>&lt;/tr&gt;</p><p>&lt;/table&gt;</p><p>&lt;hr size"1"&gt;</p><p>&lt;p&gt;&lt;font size"1" face"Arial" color"#808080"&gt;Please do not reply to</p><p>this e-mail. Mail sent to this address cannot be answered.&lt;br&gt;</p><p>For assistance, log in to your Barclays Online Bank account and choose</p><p>the &amp;quot;Help&amp;quot; link on any page.']


new_data_tfidf = tfidf_vectorizer.transform(new_data)
new_data_count = count_vectorizer.transform(new_data)

# Get probability predictions from each model
rf_probs = random_forest.predict_proba(new_data_tfidf)[:, 1]
lr_probs = logistic_regression.predict_proba(new_data_tfidf)[:, 1]
nb_probs = naive_bayes.predict_proba(new_data_count)[:, 1]

# Apply the ensemble logic (averaging the probabilities)
ensemble_probs = (rf_probs + lr_probs + nb_probs) / 3

# Convert probabilities to class labels based on a threshold
ensemble_preds = (ensemble_probs > 0.5).astype(int)

print(ensemble_preds)

# ensemble_preds is your final prediction
