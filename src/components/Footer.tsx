const Footer = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-10 bg-gray-100 text-black">
      <div>
        <h2 className="font-bold text-xl mb-3">Services</h2>
        <p className="link link-hover">Branding</p>
        <p className="link link-hover">Design</p>
        <p className="link link-hover">Marketing</p>
        <p className="link link-hover">Advertisement</p>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-3">Company</h2>
        <p className="link link-hover">About us</p>
        <p className="link link-hover">Contact</p>
        <p className="link link-hover">Jobs</p>
        <p className="link link-hover">Press kit</p>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-3">Legal</h2>
        <p className="link link-hover">Terms of use</p>
        <p className="link link-hover">Privacy policy</p>
        <p className="link link-hover">Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
