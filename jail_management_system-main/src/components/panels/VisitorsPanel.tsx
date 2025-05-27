
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Visitor {
  id: string;
  name: string;
  relationship: string;
  inmateVisiting: string;
  visitDate: string;
  visitTime: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  phone: string;
  idNumber: string;
}

const VisitorsPanel = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'Mary Johnson',
      relationship: 'Mother',
      inmateVisiting: 'John Doe (INM001)',
      visitDate: '2024-05-23',
      visitTime: '14:00',
      status: 'Scheduled',
      phone: '(555) 111-2222',
      idNumber: 'DL123456789',
    },
    {
      id: '2',
      name: 'Robert Smith',
      relationship: 'Brother',
      inmateVisiting: 'Jane Smith (INM002)',
      visitDate: '2024-05-22',
      visitTime: '10:30',
      status: 'Completed',
      phone: '(555) 333-4444',
      idNumber: 'ID987654321',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    relationship: '',
    inmateVisiting: '',
    visitDate: '',
    visitTime: '',
    phone: '',
    idNumber: '',
    status: 'Scheduled' as const,
  });

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.inmateVisiting.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVisitor = () => {
    if (!newVisitor.name || !newVisitor.relationship || !newVisitor.inmateVisiting || !newVisitor.visitDate || !newVisitor.visitTime || !newVisitor.phone || !newVisitor.idNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const visitor: Visitor = {
      id: Date.now().toString(),
      name: newVisitor.name,
      relationship: newVisitor.relationship,
      inmateVisiting: newVisitor.inmateVisiting,
      visitDate: newVisitor.visitDate,
      visitTime: newVisitor.visitTime,
      phone: newVisitor.phone,
      idNumber: newVisitor.idNumber,
      status: newVisitor.status,
    };

    setVisitors([...visitors, visitor]);
    setNewVisitor({ name: '', relationship: '', inmateVisiting: '', visitDate: '', visitTime: '', phone: '', idNumber: '', status: 'Scheduled' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Visitor scheduled successfully",
    });
  };

  const handleDeleteVisitor = (id: string) => {
    setVisitors(visitors.filter(visitor => visitor.id !== id));
    toast({
      title: "Success",
      description: "Visitor record removed successfully",
    });
  };

  const handleStatusChange = (id: string, newStatus: 'Scheduled' | 'Completed' | 'Cancelled') => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { ...visitor, status: newStatus } : visitor
    ));
    toast({
      title: "Success",
      description: `Visit status updated to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Visitors Management</h2>
          <p className="text-slate-600">Schedule and manage inmate visits</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Schedule Visit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Visit</DialogTitle>
              <DialogDescription>
                Enter visitor and visit information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Visitor Name</Label>
                  <Input
                    id="name"
                    value={newVisitor.name}
                    onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    value={newVisitor.relationship}
                    onChange={(e) => setNewVisitor({ ...newVisitor, relationship: e.target.value })}
                    placeholder="e.g., Mother, Friend"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inmateVisiting">Inmate to Visit</Label>
                <Input
                  id="inmateVisiting"
                  value={newVisitor.inmateVisiting}
                  onChange={(e) => setNewVisitor({ ...newVisitor, inmateVisiting: e.target.value })}
                  placeholder="e.g., John Doe (INM001)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitDate">Visit Date</Label>
                  <Input
                    id="visitDate"
                    type="date"
                    value={newVisitor.visitDate}
                    onChange={(e) => setNewVisitor({ ...newVisitor, visitDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visitTime">Visit Time</Label>
                  <Input
                    id="visitTime"
                    type="time"
                    value={newVisitor.visitTime}
                    onChange={(e) => setNewVisitor({ ...newVisitor, visitTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newVisitor.phone}
                    onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    value={newVisitor.idNumber}
                    onChange={(e) => setNewVisitor({ ...newVisitor, idNumber: e.target.value })}
                    placeholder="Driver's License or ID"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddVisitor}>Schedule Visit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search visitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-slate-600">Total: {visitors.length} visits</span>
      </div>

      <div className="grid gap-4">
        {filteredVisitors.map((visitor) => (
          <Card key={visitor.id} className="bg-white border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{visitor.name}</CardTitle>
                  <CardDescription>Visiting: {visitor.inmateVisiting}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select value={visitor.status} onValueChange={(value: 'Scheduled' | 'Completed' | 'Cancelled') => handleStatusChange(visitor.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteVisitor(visitor.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Relationship:</span>
                  <p>{visitor.relationship}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Date & Time:</span>
                  <p>{visitor.visitDate} at {visitor.visitTime}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Phone:</span>
                  <p>{visitor.phone}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">ID Number:</span>
                  <p>{visitor.idNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVisitors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No visits found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default VisitorsPanel;
