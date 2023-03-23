import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Terms() {
  return (
    <div>
      <Navbar />
      <div className="terms-container">
        <h1>Terms And Condition</h1>
        <div>
          <ul>
            <li>
              Welcome to Versely, a platform where users can upload and explore
              music lyrics from around the world. By using our website, you
              agree to these terms and conditions.
            </li>
            <li>
              We do not claim ownership over any of the lyrics uploaded by our
              users. However, by uploading lyrics to our platform, you are
              granting us a non-exclusive, royalty-free license to display and
              distribute the lyrics on our website.
            </li>
            <li>
              You are solely responsible for the content you upload to our
              website, including the accuracy and legality of the lyrics. We
              reserve the right to remove any content that we deem
              inappropriate, offensive, or in violation of any laws or
              regulations.
            </li>
            <li>
              You may not use our website for any illegal or unauthorized
              purpose, including but not limited to copyright infringement. If
              we receive a complaint that any content on our website infringes
              upon someone else's intellectual property rights, we may remove
              that content without notice.
            </li>
            <li>
              Our website may include links to third-party websites or
              resources. We are not responsible for the content or availability
              of these websites or resources, and we do not endorse any
              products, services, or opinions that may be offered on these
              websites.
            </li>
            <li>
              We reserve the right to modify or terminate our website at any
              time, without notice or liability to you. We also reserve the
              right to update these terms and conditions at any time. Your
              continued use of our website after any changes to these terms and
              conditions will constitute your acceptance of the new terms.
            </li>
            <li>
              Our website is provided "as is" and "as available" without any
              warranties, express or implied. We do not guarantee that our
              website will be error-free or uninterrupted, or that it will meet
              your requirements. We are not liable for any damages that may
              arise from your use of our website.
            </li>
            <li>
              These terms and conditions are governed by the laws of Indian
              Government, and any disputes arising from your use of our website
              will be resolved in accordance with these laws.
            </li>
            <li>
              If any provision of these terms and conditions is found to be
              invalid or unenforceable, the remaining provisions will remain in
              full force and effect.
            </li>
            <li>
              If you have any questions or concerns about these terms and
              conditions, please contact us at praduman03k@gmail.com.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
