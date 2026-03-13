import { Building2, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-white" />
              <span className="font-bold text-lg">Owners Platform</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              The smart platform for Owners Associations in Saudi Arabia.
            </p>
            <div className="flex gap-3">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Features</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Dashboard</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">API</p>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">About</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Press</p>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              id="resources"
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
            >
              Resources
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Docs</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Support</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Community</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Status</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2026 Owners Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
