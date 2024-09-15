import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Contact Us
        </h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-8">
          <p className="text-lg text-gray-700 mb-6">
            We&apos;d love to hear from you! Feel free to reach out through any
            of the following methods:
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/whatsapp-icon.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="mr-4"
              />
              <p className="text-gray-800">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/2349130718322"
                  className="text-blue-600 hover:underline"
                >
                  +234 9130718322
                </a>
              </p>
            </div>

            <div className="flex items-center">
              <Image
                src="/images/email-icon.png"
                alt="Email"
                width={24}
                height={24}
                className="mr-4"
              />
              <p className="text-gray-800">
                Email:{" "}
                <a
                  href="mailto:promiseuba67@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  promiseuba67@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Send us a message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
